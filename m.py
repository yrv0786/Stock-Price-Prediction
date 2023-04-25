import tensorflow as tf
import numpy as np
import pandas as pd
import math
from numpy import array

def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step):
        a = dataset[i:(i+time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

def stock(check):
    # import matplotlib.pyplot as plt
    # # Importing stock data from yahoo finance
    dataset = pd.read_csv('AAPL.csv')
    dataset.head()

    # # Splitting training and test data
    df1 = np.array(dataset['High'])
    df1 = df1.reshape(-1, 1)
    training_size = int(len(df1)*0.70)
    test_size = len(df1)-training_size
    train_data, test_data = df1[0:training_size], df1[training_size:len(df1)]

    # # Feature Scaling
    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    train_data = sc.fit_transform(train_data)
    test_data = sc.transform(test_data)

    time_step = 60
    x_train, y_train = create_dataset(train_data, time_step)
    x_test, y_test = create_dataset(test_data, time_step)

    from keras.models import Sequential
    from keras.layers import Dense
    from keras.layers import LSTM
    from keras.layers import Dropout

    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(60, 1)))
    model.add(LSTM(60, return_sequences=True))
    model.add(LSTM(70))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')

    model.fit(x_train, y_train, validation_data=(
        x_test, y_test), epochs=100, batch_size=50, verbose=1)

    # # Predicting values for test data
    if check == 0:
        y_pred = model.predict(x_test)
        y_pred = sc.inverse_transform(y_pred)
        y_test = y_test.reshape(-1, 1)
        y_test = sc.inverse_transform(y_test)

    # # Checking mean square error between y_test and y_pred
        from sklearn.metrics import mean_squared_error
        math.sqrt(mean_squared_error(y_test, y_pred))
        d=np.array_str(y_pred, precision=6, suppress_small = True)
        return d

    else:
        x_input = test_data[318:].reshape(1, -1)
        temp_input = list(x_input)
        temp_input = temp_input[0].tolist()

        lst_output = []
        n_steps = 60
        i = 0
        while (i < 30):
            if (len(temp_input) > 60):
                x_input = np.array(temp_input[1:])
                print("{} day input {}".format(i, x_input))
                x_input = x_input.reshape(1, -1)
                x_input = x_input.reshape((1, n_steps, 1))
                yhat = model.predict(x_input, verbose=0)
                print("{} day output {}".format(i, yhat))
                temp_input.extend(yhat[0].tolist())
                temp_input = temp_input[1:]
                lst_output.extend(yhat.tolist())
                i = i+1
            else:
                x_input = x_input.reshape((1, n_steps, 1))
                yhat = model.predict(x_input, verbose=0)
                temp_input.extend(yhat[0].tolist())
                lst_output.extend(yhat.tolist())
                i = i+1

        lst_output = sc.inverse_transform(lst_output)
        return lst_output
