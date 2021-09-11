import { Degree } from '../../models/Models';

export interface IAutocompleteProps {
  items: ISuggestionItem[];
  searchTitle?: string;
  suggestionCallback: (item: ISuggestionItem) => void;
  searchCallback: (item: string) => void;
  changeCallback: (value: string) => void;
  value: string;
}

export interface IAutocompleteState {
  isSuggestionDisabled: boolean;
  searchText: string;
}

export interface ISuggestionItem {
  degree: Degree | null,
  key: number;
  displayValue: string;
  searchValue: string;
  type?: string;
  tag?: any;
}