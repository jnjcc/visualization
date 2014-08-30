require("ggplot2");

heatmap <- read.csv("../data/heatmap.tsv", sep = '\t', header = TRUE);

heatmap <- transform(heatmap, Date = as.Date(Date, format = "%Y-%m-%d"));

heat.plot <- ggplot(heatmap, aes(Date, Bucket, fill = Count)) + geom_tile() +
    # to reverse the default LOW & HIGH
    scale_fill_gradient(low = "#56B1F7", high = "#132B43")
