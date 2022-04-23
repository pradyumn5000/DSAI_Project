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

## Models Used
1. Multivariate Regression
2. Random Forest Regression
3. Neural Networks with Numerical Variables
4. Neural Networks with NLP


To find the model that best predicts popularity, we tried 3 different machine learning techniques on the numerical variables. 

The result was that Neural Networks >= Random Forest > Multivariate Regression

