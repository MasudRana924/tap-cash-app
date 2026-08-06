# Reusable Components

This directory contains reusable components to maintain consistency across the application and reduce code duplication.

## Components

### 1. ScreenHeader
A standardized header component with back button, title, and optional right element.

**Props:**
- `title` (string): Header title
- `showBackButton` (boolean, optional): Show/hide back button (default: true)
- `rightElement` (ReactNode, optional): Custom right-side element
- `onBackPress` (function, optional): Custom back button handler

**Usage:**
```tsx
<ScreenHeader title="Send Money" />
<ScreenHeader title="Profile" showBackButton={false} />
<ScreenHeader 
  title="Transactions" 
  rightElement={<Icon name="options-outline" size={22} />} 
/>
```

### 2. AmountInput
A standardized amount input field with optional currency symbol.

**Props:**
- `value` (string): Input value
- `onChangeText` (function): Text change handler
- `placeholder` (string, optional): Placeholder text (default: '৳0.00')
- `showCurrencySymbol` (boolean, optional): Show currency symbol (default: false)
- `autoFocus` (boolean, optional): Auto-focus on mount (default: true)
- `keyboardType` (string, optional): Keyboard type (default: 'decimal-pad')

**Usage:**
```tsx
<AmountInput 
  value={amount} 
  onChangeText={setAmount} 
  showCurrencySymbol={true} 
/>
<AmountInput 
  value={amount} 
  onChangeText={setAmount} 
  placeholder="Enter amount" 
/>
```

### 3. QuickAmountButtons
A component for displaying quick amount selection buttons.

**Props:**
- `amounts` (string[]): Array of amount strings
- `selectedAmount` (string, optional): Currently selected amount
- `onSelectAmount` (function): Selection handler
- `layout` (string, optional): Layout style - 'row' or 'grid' (default: 'row')

**Usage:**
```tsx
<QuickAmountButtons 
  amounts={['500', '1,000', '2,000', '5,000']} 
  onSelectAmount={(amt) => setAmount(amt)} 
  layout="row" 
/>
<QuickAmountButtons 
  amounts={['100', '500', '1000', '2000']} 
  selectedAmount={selectedAmount}
  onSelectAmount={(amt) => setSelectedAmount(amt)} 
  layout="grid" 
/>
```

### 4. ConfirmButton
A standardized confirm/submit button with loading state.

**Props:**
- `title` (string): Button text
- `onPress` (function): Press handler
- `disabled` (boolean, optional): Disable button (default: false)
- `loading` (boolean, optional): Show loading indicator (default: false)
- `backgroundColor` (string, optional): Custom background color (default: '#11182e')
- `textColor` (string, optional): Custom text color (default: '#FFFFFF')

**Usage:**
```tsx
<ConfirmButton 
  title="Confirm" 
  onPress={handleConfirm} 
/>
<ConfirmButton 
  title="Submit" 
  onPress={handleSubmit} 
  loading={isLoading} 
  disabled={!isValid} 
/>
```

## Benefits

- **Consistency**: All screens use the same UI patterns
- **Maintainability**: Changes to UI patterns only need to be made in one place
- **Reduced Code Duplication**: Less repetitive code across screens
- **Type Safety**: TypeScript interfaces ensure proper prop usage
- **Flexibility**: Optional props allow customization when needed

## Screens That Can Be Refactored

The following screens can benefit from using these components:

- **ScreenHeader**: All screens with headers (SendMoneyScreen, PaymentScreen, CashOutScreen, etc.)
- **AmountInput**: AmountScreen, MobileRechargeAmountScreen, CashOutAmountScreen, SavingsAmountScreen, LoanAmountScreen, PayBillAmountScreen, PaymentAmountScreen, AddMoneyAmountScreen
- **QuickAmountButtons**: AmountScreen, AddMoneyAmountScreen, MobileRechargeAmountScreen, PaymentScreen
- **ConfirmButton**: All screens with confirm buttons

## Next Steps

To refactor screens to use these components:
1. Import the component at the top of the screen file
2. Replace the existing UI code with the component
3. Remove duplicate styles from the screen's StyleSheet
4. Test the screen to ensure functionality is preserved
