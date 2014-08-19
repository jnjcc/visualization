require("ggplot2");

stock <- read.csv("../data/stock.tsv", sep = '\t', stringsAsFactors = FALSE);

stock$Date <- as.Date(stock$Date, format = "%d-%b-%y");

line.plot <- ggplot(stock, aes(Date, Close)) + geom_line(color = "steelblue");
