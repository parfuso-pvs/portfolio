# PORT-403 - MEMX system diagrams

## Objective

Add original, code-native figures that make the MEMX configuration architecture and real-time data
flow understandable without depicting a private interface or exposing exchange data.

## Figure 01 - Configuration architecture

- The active market selects the implementation context.
- Database configuration and market-specific classes remain separate inputs because they supplied
  different categories of behavior.
- Those inputs resolve into shared platform context, Phil's reusable frontend system, and a
  market-correct sanitized server request.
- The branching composition avoids falsely presenting the database and market classes as a serial
  pipeline.

## Figure 02 - Real-time delivery

- The sequence covers exchange event, backend handler, WebSocket delivery, missing or malformed
  field handling, and efficient live UI integration.
- It deliberately excludes IPO field names, payload shapes, prices, share quantities, and private
  exchange behavior.

## Accessibility and responsive behavior

- Both diagrams are semantic `figure` elements with visible captions and separate concise text
  equivalents.
- Desktop paths use wide ruled compositions; mobile paths become vertical, preserving source order.
- The figures are static Server Components, so loading, empty, error, success, hover, focus,
  disabled, and active states do not apply.

## Visual direction

- The configuration view uses the blueprint material to communicate configuration and branching.
- The real-time path uses graphite and accessible light cobalt to distinguish movement through a
  live channel.
- Neither view resembles an exchange dashboard, trading screen, or reconstructed MEMX product.
