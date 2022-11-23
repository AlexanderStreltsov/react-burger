import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IFeedIngredient } from "../../utils/types";

interface IIngredientsGroupImagesProps {
  ingredients: (IFeedIngredient | undefined)[];
  max?: number;
}

const IngredientsGroupImages: FC<IIngredientsGroupImagesProps> = ({
  ingredients,
  max = 7,
}) => {
  const customTheme = createTheme({
    components: {
      MuiAvatarGroup: {
        styleOverrides: {
          avatar: {
            width: "64px",
            height: "64px",
            backgroundPosition: "center",
            backgroundSize: "170%",
            backgroundColor: "#131316",
            border: "2px solid #4C4CFF",
            fontFamily: "JetBrains Mono",
            fontSize: "20px",
            lineHeight: "24px",
            fontWeight: "400",
          },
        },
      },
    },
  });

  const styleDarkless =
    "linear-gradient(to right, black 0%, transparent 90%), ";

  return (
    <ThemeProvider theme={customTheme}>
      <AvatarGroup max={max} spacing={22}>
        {ingredients.map((ingredient, index) => {
          return (
            <Avatar
              key={index}
              sx={{
                background: `${ingredient!.count > 1 ? styleDarkless : ""}url(${
                  ingredient!.image_mobile
                })`,
              }}
            >
              {ingredient!.count > 1 ? `×${ingredient!.count}` : " "}
            </Avatar>
          );
        })}
      </AvatarGroup>
    </ThemeProvider>
  );
};

export default IngredientsGroupImages;
