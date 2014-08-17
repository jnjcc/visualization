source("../utils/utils.r");
require("ggplot2");

freq.tsv <- read.csv("../data/freq.tsv", sep = '\t', header = TRUE);

vertical.bar <- ggplot(freq.tsv, aes(Letter, Frequency)) +
    geom_bar(stat = "identity", fill = "steelblue", color = "black") +
    geom_text(aes(label = Frequency), vjust = -0.2, size = 3);

horizont.bar <- ggplot(freq.tsv, aes(reorder(Letter, Frequency), Frequency)) +
    geom_bar(stat = "identity", fill = "steelblue", color = "black") +
    geom_text(aes(label = Frequency), hjust = -0.1, size = 3) +
    coord_flip() +
    xlab("Letter") + ylim(0.0, max(freq.tsv$Frequency) * 1.05);

# multiplot(vertical.bar, horizont.bar);
