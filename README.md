# SC1015 - Song-Popularity analysis ♫

## About

This SC1015 Mini-Project focuses on finding what makes a song popular based on many variables. Two datasets are extracted from [Spotify’s API](https://developer.spotify.com/documentation/web-api/) and [Kaggle](https://www.kaggle.com/datasets/neisse/scrapped-lyrics-from-6-genres?resource=download) respectively, and then merged together. For detailed walkthrough, please view the source code in order from:

1. [Data Extraction & Cleaning](https://github.com/pradyumn5000/DSAI_Project/blob/main/data_cleaning.ipynb)
2. [Data Visualisation & EDA](https://github.com/pradyumn5000/DSAI_Project/blob/main/EDA.ipynb)
3. [Multivariate Regression](https://github.com/pradyumn5000/DSAI_Project/blob/main/Muti_Var%20Regression.ipynb)
4. [Random Forest Regression](https://github.com/pradyumn5000/DSAI_Project/blob/main/random_forest.ipynb)
5. [Numerical Variables Neural Network](https://github.com/pradyumn5000/DSAI_Project/blob/main/neural_network.ipynb)
6. [NLP & Neural Network](https://github.com/pradyumn5000/DSAI_Project/blob/main/nlp.ipynb)

## Problem Definition
Can we quantitatively predict the popularity of a song given its feature and lyrics?

Features include:

1. Numerical: tempo, danceability, loudness, key etc. 
2. Categorical: explicit (true/false)
3. Lyrics: language

## Data Extraction, Cleaning, Merging
The features of songs, including the popularity, are first extracted from Spotify's API with 10,880 songs. We cleaned this data by removing duplicated rows, any rows with null values,  irrelevant columns such as URL, and songs with '0' popularity.


However, the dataset did not include lyrics of the songs. Thus, we found another dataset on Kaggle containing 4,169 songs with lyrics. After cleaning this dataset, using the song's name present in both datasets, we merged them together to obtain a dataset with ~1400 songs.

## Exploratory Data Analysis
To carry out EDA, we separated datasets into numerical variables only, and categorical variables only.

Plotting a correlation heatmap showed no significant linear relationship between popularity and other variables such as tempo and acousticness. This was understandable as simply maximising a musical feature does not guarantee a popular song. We hypothesized that there exists non-linear relationships between the response variables and predictor popularity variable.


For categorical variable datasets only had one variable that may be a response variable to popularity - explicit (true/false). Boxplot and strip plot gave interesting results with explicit songs appearing likely to be more popular. However, the low count of explicit songs compared to non-explicit songs and high variance make it inconclusive.😟

For our lyrics data, we removed common stop words such as 'I', 'is', 'are'. Then, we plotted the most common words, many of which are linked to emotions of love like "love", "feel", "girl" and "baby".

## Models Used
To find the model that best predicts popularity, we tried 3 different machine learning techniques on the numerical variables. 
1. Multivariate Regression
2. Random Forest Regression
3. Neural Networks with Numerical Variables


**Result: Neural Networks >= Random Forest > Multivariate Regression**

Absolute Mean Error (Neural Network): ±0.17 (Predictor Range: 0.00-1.00)


For our lyrics dataset, we tried Neural Networks with NLP, where it performed similarly to Neural Networks with Numerical Variables (±0.19 AME).

## Evaluation of Models
The results showed that Multivariate Regression was the worst performing model out of the three. This fits our hypothesis of non-linearity relationship between variables.

Between Random Forest and Neural Networks, we found that Neural Networks gave slightly better results of -0.01~0.03. However, one benefit of Random Forest is that we were able to see the weight of each variables in predicting popularity, giving important insights into what really makes up a popular song. Whereas for Neural Network, we were not able to see the weights given to each variables due to the hidden layers and black-box nature of Neural Networks.


Neural Networks with our lyrics dataset performed similarly to our best numerical variable models. This would imply that the lyrics of a song was equally important in predicting popularity.

## Conclusion
With 2 types of models having similar performance, 1 based on numerical variables, another based on lyrics, we conclude that it is possible to quantitatively predict popularity given its features and lyrics (±0.17 error), using machine learning techniques. We recommend to use both models and compute the average to get a more holistic and complete prediction👍


Our models have also given insights into variables that make up a popular song, with the top three being: Artist's Popularity, Speechiness, Danceability. However, we did not test for all factors that could influence popularity. This could includes the amount of promotions different songs had, the quality of music video and more, which could account for our ±0.17 error. 

Limitations:
1. Taste and preferences may change over time. Musical features that didn’t appear prevalent in our models may become significant in predicting the song’s popularity in the future, leading to model inaccuracy⬇📉
2. Different demographics. Our datasets were scraped from Spotify's Global Charts and did not take into account of different demographics. Music that is popular in one country may not be as popular in another country.⬇📉

## Contributors
- Pradyum: Data Extraction, Cleaning, Merging & Neural Networks
- Wei Xu: EDA, Random Forest
- Ranjan: Multivariate Regression, Presentation
## References
