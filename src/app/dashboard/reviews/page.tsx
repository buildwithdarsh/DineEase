"use client";

import { Star, MessageSquare, ThumbsUp, AlertTriangle, Reply, Camera, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reviews } from "@/lib/platform-data";
import { StarRating } from "@/components/shared/star-rating";
import { useLoading } from "@/hooks/use-loading";
import { TableSkeleton } from "@/components/shared/loading-skeleton";

export default function ReviewsPage() {
  const loading = useLoading(900);

  if (loading) return <div className="p-6"><TableSkeleton rows={5} /></div>;

  const avgRating = reviews.reduce((s, r) => s + r.overallRating, 0) / reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.overallRating === star).length,
    pct: Math.round((reviews.filter((r) => r.overallRating === star).length / reviews.length) * 100),
  }));

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Review Management</h1>
        <p className="text-sm text-muted-foreground">{reviews.length} reviews | {reviews.filter((r) => !r.restaurantResponse).length} awaiting response</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-5xl font-bold mb-2">{avgRating.toFixed(1)}</p>
            <StarRating rating={avgRating} size={20} showValue={false} className="justify-center mb-1" />
            <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-sm mb-3">Rating Distribution</h3>
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2 mb-1.5">
                <span className="w-4 text-xs text-right">{d.star}</span>
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">{d.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold text-sm">Quick Stats</h3>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Response Rate</span><span className="font-medium">{Math.round((reviews.filter((r) => r.restaurantResponse).length / reviews.length) * 100)}%</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Food Rating</span><span className="font-medium">{(reviews.reduce((s, r) => s + r.foodRating, 0) / reviews.length).toFixed(1)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Service Rating</span><span className="font-medium">{(reviews.reduce((s, r) => s + r.serviceRating, 0) / reviews.length).toFixed(1)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Ambiance Rating</span><span className="font-medium">{(reviews.reduce((s, r) => s + r.ambianceRating, 0) / reviews.length).toFixed(1)}</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className={review.overallRating <= 2 ? "ring-1 ring-red-300 dark:ring-red-800" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img src={review.customerAvatar} alt={review.customerName} className="size-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{review.customerName}</span>
                    {review.isVerified && <Badge variant="secondary" className="text-[10px] h-4">Verified</Badge>}
                    {review.overallRating <= 2 && (
                      <Badge className="text-[10px] bg-red-100 text-red-800 border-0 dark:bg-red-900 dark:text-red-300">
                        <AlertTriangle className="size-3 mr-0.5" /> Needs Attention
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <StarRating rating={review.overallRating} size={14} />
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span>Food: {review.foodRating}</span>
                      <span>Service: {review.serviceRating}</span>
                      <span>Ambiance: {review.ambianceRating}</span>
                      <span>Value: {review.valueRating}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{review.comment}</p>
                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {review.photos.map((photo, i) => (
                        <img key={i} src={photo} alt={`Review photo ${i + 1} by ${review.customerName}`} className="h-16 w-24 rounded-lg object-cover" />
                      ))}
                    </div>
                  )}
                  {review.dishesReviewed.length > 0 && (
                    <div className="flex gap-1.5 mb-3">
                      {review.dishesReviewed.map((dish) => (
                        <Badge key={dish} variant="outline" className="text-[10px]">{dish}</Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <ThumbsUp className="size-3" /> {review.helpfulCount} found helpful
                  </div>

                  {/* Response */}
                  {review.restaurantResponse ? (
                    <div className="p-3 rounded-lg bg-muted/50 border-l-2 border-primary">
                      <div className="flex items-center gap-1 text-xs font-medium mb-1">
                        <Reply className="size-3" /> Your Response
                        <span className="text-muted-foreground ml-1">
                          {review.respondedAt && new Date(review.respondedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.restaurantResponse}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Textarea placeholder="Write a response to this review..." rows={2} className="text-sm" />
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs gap-1"><Reply className="size-3" /> Respond</Button>
                        <Button size="sm" variant="outline" className="text-xs">Use Template</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
