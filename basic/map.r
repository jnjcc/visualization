require("maps");
require("ggplot2");

usa_states <- map_data("state");

theme_clean <- function(base_size = 12) {
    require(grid); # for unit() function
    theme_grey(base_size) %+replace%
    theme(
        axis.title = element_blank(),
        axis.text = element_blank(),
        panel.background = element_blank(),
        panel.grid = element_blank(),
        axis.ticks.length = unit(0, "cm"),
        axis.ticks.margin = unit(0, "cm"),
        panel.margin = unit(0, "lines"),
        plot.margin = unit(c(0, 0, 0, 0), "lines"),
        complete = TRUE
        )
};

ggplot(usa_states, aes(x = long, y = lat, group = group)) +
    geom_polygon(fill = "steelblue", color = "black") + theme_clean();
