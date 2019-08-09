# liri-node-app

Created by: `Roopa Patel`
Date created: `August 8th`

- - -

## LIRI
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The  `Commands` are:

LIRI stands for Language Interpretation and Recognition Interface. This command line node application has the ability to take in set parameters and returns with data. There are four main  `Commands` that use their own specific parameters that the user has an option of choosing. 

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
   
   * `concert-this`

- - -
## LIRI Step by step 
### **Video Guide**

Watch the video here: https://drive.google.com/file/d/1tU4ybD-Bt0qtxKGp9n5Xv3fS_VL-rZpl/view?usp=sharing

### **Step by Step instructions**

1. Launch terminal/bash/command prompt.
2. Locate the folder that contains the `liri.js` file. 
3. Based on the chosen command, the output has different outcomes

   

    -Example 1: Run the `spotify-this-song` command
    
        node liri.js spotify-this-song <name of song>
    
    Output: The system will log(log.txt) the information and release a list of information associated with the song which includes multiple records.

    ![Results](/images/spotify.png)


     -Example 2: Execute the `concert-this` command
    
        node liri.js concert-this <name of artist or band>
    
    Output: The system will log the information and release a list of all events and locations based on the artist. 
    ![Results](/images/concert.png)



    -Example 3: Run the `do-what-it-says` command
        
        node liri.js do-what-it-says
        
    Output: The system will open random.txt file with the given text and shows the comman shown in the random.txt file. 
   

    ![Results](/images/doWhatItSAYS.png)
     -Example 4: Run the `movie-this` command
    
        node liri.js movie-this <name of movie>
    
    Output: The system will log in the info and display all information pertaining to the movie.
    ![Results](/images/movies.png)

- - -

## TECHNOLOGIES USED
- APIs used:
    * Bands in Town
    * OMDB
- Javascript
- Nodejs
- Node packages:
    * Node-Spotify-API
    * Request
    * Moment
    * DotEnv

- Git
- GitHub
