import {MaterialCommunityIcons} from '@expo/vector-icons';

export const categories: {name: string; materialCommunityIcon: keyof typeof MaterialCommunityIcons.glyphMap}[] = [
  {name: 'Debt', materialCommunityIcon: 'credit-card-minus'},
  {name: 'Clothing', materialCommunityIcon: 'tshirt-crew'},
  {name: 'Education', materialCommunityIcon: 'book-education'},
  {name: 'Entertainment', materialCommunityIcon: 'glass-mug-variant'},
  {name: 'Food', materialCommunityIcon: 'food'},
  {name: 'Gifts/Donations', materialCommunityIcon: 'gift'},
  {name: 'Healthcare', materialCommunityIcon: 'pill'},
  {name: 'Household Items', materialCommunityIcon: 'tools'},
  {name: 'Housing', materialCommunityIcon: 'home-minus'},
  {name: 'Insurance', materialCommunityIcon: 'shield-home'},
  {name: 'Personal', materialCommunityIcon: 'hair-dryer'},
  {name: 'Savings', materialCommunityIcon: 'piggy-bank'},
  {name: 'Transportation', materialCommunityIcon: 'bus'},
  {name: 'Utilities', materialCommunityIcon: 'water'},
  {name: 'Other', materialCommunityIcon: 'crosshairs-question'},
];

export const accounts: string[] = ['Bank Account', 'Cash'];
