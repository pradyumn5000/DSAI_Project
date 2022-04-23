# SC1015 - Song-Popularity analysis ♫

## About

This SC1015 Mini-Project focuses on finding what makes a song popular based on many variables. Three datasets are extracted from [Spotify’s API](https://developer.spotify.com/documentation/web-api/) and [Kaggle](https://www.kaggle.com/datasets/neisse/scrapped-lyrics-from-6-genres?resource=download) respectively, and then merged together. For detailed walkthrough, please view the source code in order from:

1. [Data Extraction](https://github.com/pradyumn5000/DSAI_Project/blob/main/Spotify_API)
2. [Data Cleaning](https://github.com/pradyumn5000/DSAI_Project/blob/main/data_cleaning.ipynb)
3. [Data Visualisation & EDA](https://github.com/pradyumn5000/DSAI_Project/blob/main/EDA.ipynb)
4. [Multivariate Regression](https://github.com/pradyumn5000/DSAI_Project/blob/main/Muti_Var%20Regression.ipynb)
5. [Random Forest Regression](https://github.com/pradyumn5000/DSAI_Project/blob/main/random_forest.ipynb)
6. [Numerical Variables Neural Network](https://github.com/pradyumn5000/DSAI_Project/blob/main/neural_network.ipynb)
7. [Natural Language processing](https://github.com/pradyumn5000/DSAI_Project/blob/main/nlp.ipynb)

## Problem Definition
Can we quantitatively predict the popularity of a song given its feature and lyrics?

Features include:

1. Numerical: tempo, danceability, loudness, key etc. 
2. Categorical: explicit (true/false)
3. Lyrics: language

## Data Extraction, Cleaning, Merging
The features of songs, including the popularity, are first extracted from Spotify's API with 10,880 songs. We cleaned this data by removing duplicated rows, any rows with null values,  irrelevant columns such as URL, and songs with '0' popularity.


However, the dataset did not include lyrics of the songs. Thus, we found another dataset on Kaggle containing 4,169 songs with lyrics. This dataset came along with another dataset containing artist popularities and the number of songs by the artist. After cleaning these datasets, using the song's name and artist name present in all 3 datasets, we merged them together to obtain a dataset with ~1300 songs.

Information about each column can be found below. (Note: the values stated are before Min-Max Normalization)

 1.   album_name          object  - Name of the album
 2.   release_date        object  - Date of release of the album in the format YYYY/MM/DD
 3.   artist_name         object  - Name of the artist
 4.   explicit            object  - True/False value describing if a song is explicit or not
 5.   song_name           object  - Name of the song
 6.   lyrics              object  - Lyrics of the song
 7.   language            object  - Language of the lyrics of the song for eg. en(english)
 8.   album_total_tracks  float64 - Total number of tracks in the album
 9.   duration_ms         float64 - The duration of the track in milliseconds.
 10.  popularity          float64 - The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
 11.  danceability        float64 - Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
 12.  energy              float64 - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
 13.  key                 float64 - The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
 14.  loudness            float64 - The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
 15.  mode                float64 - Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
 16.  speechiness         float64 - Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
 17.  acousticness        float64 - A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
 18.  instrumentalness    float64 - Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
 19.  liveness            float64 - Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
 20.  valence             float64 - A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
 21.  tempo               float64 - The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
 22.  time_signature      float64 - An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
 23.  artist_songs        float64 - Number of songs the artist has released
 24.  artist_popularity   float64 - The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.

The cleaned and raw datasets(csv) can found in the [Datasets](https://github.com/pradyumn5000/DSAI_Project/blob/main/Datasets) folder

## Exploratory Data Analysis
To carry out EDA, we separated our dataset into 
1. numerical variables only
2. categorical variables + popularity

Plotting a correlation heatmap showed no significant linear relationship between popularity and other variables such as tempo and acousticness. This was understandable as creating a song is complicated and simply maximising a musical feature does not guarantee a popular song. We hypothesized that there exists non-linear relationships between the response variables and predictor popularity variable.


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
- Pradyumn: Data Extraction, Cleaning, Merging & Neural Networks
- Wei Xu: EDA, Random Forest
- Ranjan: Multivariate Regression, Presentation
## References
