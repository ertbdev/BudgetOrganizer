import {MaterialCommunityIcons} from '@expo/vector-icons';

export const categories: {[key: string]: {materialCommunityIcon: keyof typeof MaterialCommunityIcons.glyphMap}} = {
  debt: {materialCommunityIcon: 'credit-card-minus'},
  clothing: {materialCommunityIcon: 'tshirt-crew'},
  education: {materialCommunityIcon: 'book-education'},
  entertainment: {materialCommunityIcon: 'glass-mug-variant'},
  food: {materialCommunityIcon: 'food'},
  'gifts/donations': {materialCommunityIcon: 'gift'},
  healthcare: {materialCommunityIcon: 'pill'},
  'household items': {materialCommunityIcon: 'tools'},
  housing: {materialCommunityIcon: 'home-minus'},
  insurance: {materialCommunityIcon: 'shield-home'},
  personal: {materialCommunityIcon: 'hair-dryer'},
  savings: {materialCommunityIcon: 'piggy-bank'},
  transportation: {materialCommunityIcon: 'bus'},
  utilities: {materialCommunityIcon: 'water'},
  other: {materialCommunityIcon: 'crosshairs-question'},
};

export const categoryList = Object.keys(categories);

export const accounts: string[] = ['Bank Account', 'Cash'];
