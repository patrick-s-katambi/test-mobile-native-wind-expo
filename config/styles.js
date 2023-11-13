import { Typography, Colors, Spacings } from "react-native-ui-lib";

Colors.loadColors({
    pink: "#FF69B4",
    gold: "#FFD700",
});

Typography.loadTypographies({
    h1: { fontSize: 58, fontWeight: "300", lineHeight: 80 },
    h2: { fontSize: 46, fontWeight: "300", lineHeight: 64 },
    h3: { fontSize: 34, fontWeight: "300", lineHeight: 48 },
});

Spacings.loadSpacings({
    page: 20,
});
