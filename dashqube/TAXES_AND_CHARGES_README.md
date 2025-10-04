# Purchase Taxes and Charges Functionality

This document describes the new taxes and charges functionality added to the DashQube purchase page.

## Features

### 1. Tax Template Selection
- **Template Dropdown**: Select from existing Purchase Taxes and Charges Templates
- **Auto-apply**: Automatically applies all taxes from the selected template
- **Template Management**: Loads available templates from the system

### 2. Manual Tax Addition
- **Add Tax/Charge Button**: Manually add individual taxes or charges
- **Tax Types Supported**:
  - On Net Total (percentage of net total)
  - On Item Quantity (percentage of total quantity)
  - On Previous Row Amount (percentage of previous row)
  - On Previous Row Total (percentage of previous row total)
  - Actual (fixed amount)

### 3. Tax Configuration
- **Account Head**: Link to appropriate accounting account
- **Tax Rate**: Percentage or fixed amount
- **Description**: Optional description for the tax/charge
- **Real-time Calculation**: Automatic calculation based on cart items

### 4. Tax Management
- **Edit Tax Rates**: Click on tax rate to edit directly
- **Remove Taxes**: Remove individual taxes with × button
- **Real-time Updates**: All calculations update automatically

## Usage

### Adding Items to Cart
1. Select items from the left panel
2. Set quantity and rate for each item
3. Items automatically appear in the cart

### Applying Tax Templates
1. Add items to cart (taxes section appears)
2. Select a tax template from the dropdown
3. All taxes from the template are automatically applied
4. Totals are recalculated

### Adding Manual Taxes
1. Click "Add Tax/Charge" button
2. Fill in the tax details:
   - Type: Select tax calculation method
   - Account Head: Choose accounting account
   - Tax Rate: Enter percentage or amount
   - Description: Optional description
3. Click "Add" to apply

### Editing Taxes
- **Rate**: Click on the tax rate percentage to edit
- **Remove**: Click the × button to remove a tax

## Technical Details

### File Location
- `apps/dashqube/dashqube/dashqube/page/purchase/purchase.js`

### Key Methods
- `show_add_tax_dialog()`: Shows tax addition dialog
- `add_tax(tax_data)`: Adds a new tax to the system
- `remove_tax(tax_id)`: Removes a tax
- `update_tax_rate(tax_id, new_rate)`: Updates tax rate
- `apply_tax_template()`: Applies selected tax template
- `calculate_tax_amount(tax)`: Calculates tax amount based on type
- `update_totals()`: Updates all totals including taxes

### Data Structure
```javascript
tax: {
    id: unique_id,
    type: 'On Net Total' | 'On Item Quantity' | 'On Previous Row Amount' | 'On Previous Row Total' | 'Actual',
    account_head: 'account_name',
    tax_rate: 15.0,
    description: 'Optional description',
    amount: calculated_amount
}
```

### Integration with Purchase Orders
When creating a purchase order, all taxes are automatically included in the `taxes` field as `Purchase Taxes and Charges` records.

## Styling

The taxes section uses consistent styling with the rest of the purchase page:
- Clean, modern interface
- Responsive design
- Hover effects and transitions
- Consistent color scheme

## Future Enhancements

Potential improvements for future versions:
1. Tax category grouping
2. Advanced tax calculation rules
3. Tax exemption handling
4. Multi-currency tax support
5. Tax reporting and analytics
