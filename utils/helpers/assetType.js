import ASSET_TYPES from "utils/constants/asset-types";

const getAssetTypeLabel = type => {
  const assetType = ASSET_TYPES.find(assetType => assetType.value === type);
  return assetType ? assetType.label : type;
};

export {
  getAssetTypeLabel
};