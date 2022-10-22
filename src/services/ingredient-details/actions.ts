import { IActionTypes, ILoadImageAction } from "./types";

export const name: "DETAILS" = "DETAILS";

export const ActionTypes: IActionTypes = {
  LOAD_IMAGE: `${name}/LOAD_IMAGE`,
};

export const loadImage = (status: boolean): ILoadImageAction => {
  return {
    type: ActionTypes.LOAD_IMAGE,
    payload: status,
  };
};
