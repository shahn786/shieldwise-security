#!/bin/bash
# ShieldWise Schema Fixes Deployment Script
# Deploy via SSH: bash deploy-schema-fixes.sh

echo "🔧 Deploying Schema Markup Fixes to Production..."
echo "Server: 31.220.57.141"
echo ""

ssh shieldwisesecurity@31.220.57.141 << 'ENDSSH'
cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com

echo "📝 Fixing VideoObject schema in index.ejs..."
sed -i 's/"startOffset-input": "required"/"query-input": "required name=seek_to_second_number"/g' views/index.ejs

echo "📝 Fixing Review schema in schema-patrol-review.ejs..."
cat > views/partials/schema-patrol-review.ejs << 'SCHEMA'
<!-- Review Schema for Voice Search & Rich Snippets -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Mobile Patrol Security Services",
  "name": "Mobile Patrol Security Services - Southern California",
  "provider": {
    "@type": "LocalBusiness",
    "name": "ShieldWise Security",
    "url": "https://shieldwisesecurity.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "247",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Robert Martinez"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-10-15",
      "reviewBody": "ShieldWise mobile patrols have been instrumental in reducing incidents at our commercial properties in Riverside. Their random patrol patterns and detailed reporting give us peace of mind, and their rates are the best we found in Southern California."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Lisa Chen"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-09-22",
      "reviewBody": "The mobile patrol service has transformed our community security in San Bernardino. Residents feel safer and we've seen a significant decrease in property crimes. Best value for money in the area!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "David Thompson"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "datePublished": "2024-10-01",
      "reviewBody": "Professional, reliable, and thorough. The patrol reports are excellent and their response time to alarms is outstanding. Most affordable patrol service we've used in Orange County."
    }
  ],
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "45",
    "highPrice": "85",
    "offerCount": "6"
  }
}
</script>
SCHEMA

echo "🔄 Restarting PM2 application..."
pm2 restart shieldwise && pm2 save

echo "✅ Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. Test at https://search.google.com/test/rich-results"
echo "2. Validate fixes in Google Search Console"
echo "3. Monitor for rich snippets in search results"
ENDSSH

echo ""
echo "✅ Schema fixes deployed successfully!"
