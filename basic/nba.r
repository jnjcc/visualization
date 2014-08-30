require("reshape2");
require("ggplot2");

nba.raw <- read.csv("../data/nba.tsv", sep = '\t', header = TRUE);

nba.frame <- melt(nba.raw, id.vars = "Name", variable.name = "Attribute",
                  value.name = "Score");

nba.plot <- ggplot(nba.frame, aes(Attribute, Name, fill = Score)) + geom_tile();
