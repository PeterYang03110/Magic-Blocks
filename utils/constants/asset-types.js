const ASSET_TYPES = [
  {
    value: 'BLUEPRINT_RECIPE',
    label: 'Blueprints & Recipes'
  },
  {
    value: 'FIEF_ITEMS',
    label: 'Items'
  },
  {
    value: 'COMPANIONS',
    label: 'Companions'
  },
];

export const BLUEPRINT_ATTRIBUTES = [
  {
    trait_type: 'Output Class',
    description: 'Output Class is the style of the item this Blueprint allows you to craft.'
  },
  {
    trait_type: 'Output Type',
    description: 'Output Type is the specific item category of the item this Blueprint allows you to craft. Each item category has its own associated skill trees.'
  },
  {
    trait_type: 'Usage Cost',
    description: 'Usage Cost is a general measure of crafting cost. The higher the Usage Cost, the more in-game resources, materials or ingredients required to create the associated item. Be warned - the required input amounts to craft an item with a Blueprint increase with each craft!'
  },
]

export default ASSET_TYPES;