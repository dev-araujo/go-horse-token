export const ERROR_MAPPINGS: Record<string, string> = {
  ExceedsMaxSupply: "Cannot mint: exceeds maximum supply of tokens.",
  InvalidAmount: "Invalid amount: must be a whole number of tokens.",
  InsufficientBalance: "Insufficient POL sent to cover the minting fee.",
  TransferFailed: "Failed to transfer minting fee to the recipient.",
  ExactFeeRequired: "The exact minting fee must be sent; no more, no less.",
};
