# Stock-Price-Prediction

## Stock Market Prediction using LSTM
LSTM or Long Short-Term Memory is an improvement over traditional RNN or Recurrent Neural Network in the sense that it can effectively “remember” long sequence of events in the past. Just like humans can derive information from the previous context and can chart his future actions, RNN and LSTM tends to imitate the same. The difference between RNN and LSTM is that RNN is used in places where the retention of memory is short, whereas LSTM is capable of connecting events that happened way earlier and the events that followed them.

Hence, it (LSTM) is one of the best choices when it comes to analyzing and predicting temporal dependent phenomena which spans over a long period of time or multiple instances in the past.

### How LSTM Works?
LSTM is capable of performing three main operations: Forget, Input and Output. These operations are made possible with the help of trained neural network layers like the tanh layer and the sigmoid layer. These layers decide whether an information needs to be forgotten, updated and what values need to be given as output. LSTM learns which parameter to learn, what to forget and what to be updated during the training process. That is the reason why LSTM requires a huge amount of dataset during its training and validation process for a better result. The sigmoid layer decides the flow of information. Whether it needs to allow all of the information or some of it or nothing.
There are multiple gates that performs the role of Forget, Input and Output. These gates perform the respective operation on the cell state which carries information from the past. The forget gate layer tells the LSTM cell whether to keep the past information or completely throw away. The input gate determines what new information should be added to the cell state. The output gate finally gives the output which is a filtered version of the cell state.

<img src="https://user-images.githubusercontent.com/113554794/234185610-1fc496c2-8115-4013-8d25-315fcfde83bc.png" width="900" height="300">
Forget Gate: Responsible for removing useless information. <br />
Input Gate: Responsible for adding new information. <br/>
Output Gate: Responsible for filtering out the information. <br/>

### Project Descprition
This project is an attempt to predict the Stock Market Price using LSTM and for this purpose we have twitter stocks to analyse.
Then it would calculate the estimated price of stock based on the historical data for the next 30 days.
