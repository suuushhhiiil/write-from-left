import { APIResponse } from "../../utils/APIResponse.js";

export const getHealth = async (req, res) => {
  return res.status(200).json(new APIResponse(200, "App is Healthy", null));
};
