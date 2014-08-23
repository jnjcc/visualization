require("ggplot2");

iris <- read.csv("../data/iris.tsv", sep = '\t', header = TRUE);

iris.plot <- ggplot(iris, aes(sepalWidth, sepalLength, color = species)) +
    geom_point() + labs(x = "Speal Width (cm)", y = "Sepal Length (cm)");

# iris.plot + stat_smooth(method = lm, se = FALSE, fullrange = TRUE);
