/**
 * Inline Edit Components
 *
 * A comprehensive library of inline editable components that provide
 * a consistent user experience for editing values in place.
 *
 * @module inline-edit
 */

// Types
export type {
  EditableState,
  RenderEditModeProps,
  BaseEditableProps,
  BaseEditableInternalState,
  EditableSelectOption,
} from './types';

// Base Component
export { BaseEditable } from './BaseEditable';

// Variant Components
export { EditableText, type EditableTextProps } from './EditableText';
export { EditableSelect, type EditableSelectProps } from './EditableSelect';
export { EditableTitle, type EditableTitleProps } from './EditableTitle';
export { EditableTextarea, type EditableTextareaProps } from './EditableTextarea';
export { EditableDate, type EditableDateProps } from './EditableDate';
export { EditableNumber, type EditableNumberProps } from './EditableNumber';
export { EditableCurrency, type EditableCurrencyProps } from './EditableCurrency';
export { EditablePercent, type EditablePercentProps } from './EditablePercent';
