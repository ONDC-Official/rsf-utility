# Settlement Update CSV Template

This file shows the expected format for CSV uploads to update settlements.

## Required Fields

- `order_id`: Unique identifier for the order (required)

## Optional Fields

- `total_order_value`: Total value of the order (number)
- `withholding_amount`: Amount to withhold (number)
- `tds`: Tax Deducted at Source (number)
- `tcs`: Tax Collected at Source (number)
- `commission`: Commission amount (number)
- `collector_settlement`: Collector settlement amount (number)

## Example CSV Content:

```csv
order_id,total_order_value,withholding_amount,tds,tcs,commission,collector_settlement
ORD001,1000.50,100.00,20.00,15.00,50.00,815.50
ORD002,2500.75,250.00,50.00,37.50,125.00,2038.25
ORD003,750.00,75.00,15.00,11.25,37.50,611.25
```

## Usage:

1. Create a CSV file with the above format
2. Upload it using the PATCH `/settle/:userId` endpoint
3. Set Content-Type as `multipart/form-data`
4. Use field name `csvFile` for the file upload

## Notes:

- Empty values for optional fields will be ignored
- Invalid numeric values will cause validation errors
- Each row represents one settlement update
- The order_id must exist in the system for the specified user
