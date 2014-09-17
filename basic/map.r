source("../utils/ggutils.r");
require("maps");

usa_states <- map_data("state");

r_map <- ggplot(usa_states, aes(x = long, y = lat, group = group)) +
    geom_polygon(fill = "steelblue", color = "black") + theme_clean();
