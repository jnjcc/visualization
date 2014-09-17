source("../utils/ggutils.r");
require("jsonlite");

json_data <- fromJSON("../data/us-states.json");

names_list <- lapply(json_data$features$properties$name, function(n) {
    data.frame(state = n); });

gen_coords <- function(coord) {
    if (!is.null(dim(coord))) {
        # Polygon
        data.frame(long = coord[, , 1], lat = coord[, , 2]);
    } else {
        # MultiPolygon: to be deleted
        data.frame(type = "MultiPolygon");
    }
}

coords_list <- lapply(json_data$features$geometry$coordinates, gen_coords);

states_list <- mapply(cbind, coords_list, names_list);

polygon_states <- Filter(function(e) ncol(e) == 3, states_list);

map_frame <- Reduce(rbind, polygon_states);

json_map <- ggplot(map_frame, aes(x = long, y = lat, group = state)) +
    geom_polygon(fill = "steelblue", color = "black") + theme_clean();
