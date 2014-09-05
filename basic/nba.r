require("reshape2"); # for melt()
require("plyr"); # for ddply()
require("scales"); # for rescale()
require("ggplot2");

nba.raw <- read.csv("../data/nba.tsv", sep = '\t', header = TRUE);

nba.melt <- melt(nba.raw, id.vars = "Name", variable.name = "Attribute",
                  value.name = "Score");

nba.frame <- ddply(nba.melt, .(Attribute), transform, Rescale = rescale(Score));

nba.plot <- ggplot(nba.frame, aes(Attribute, Name, fill = Rescale)) +
    geom_tile() +
    scale_fill_gradient(low = "white", high = "steelblue", guide = FALSE) +
    scale_x_discrete(expand = c(0, 0)) +
    scale_y_discrete(expand = c(0, 0));
