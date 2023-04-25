import tensorflow as tf
import numpy as np
import pandas as pd
from pickle import dump, load
from numpy import array
import math

def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step):
        a = dataset[i:(i+time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

def make_pred():
    # # Importing stock data from yahoo finance
    dataset = pd.read_csv('AAPL.csv')
    dataset.head()

    # # Splitting training and test data
    df1 = np.array(dataset['High'])
    df1 = df1.reshape(-1, 1)
    print(type(df1))
    training_size = int(len(df1)*0.70)
    test_size = len(df1)-training_size
    test_data = df1[training_size:len(df1)]

    scalar = load(open('scalar.pkl', 'rb'))
    # model = load(open('model.pkl','rb'),encoding='latin1')
    model = tf.keras.models.load_model("again_model.h5")

    test_data = scalar.transform(test_data)

    time_step = 60
    x_test, y_test = create_dataset(test_data, time_step)
    y_pred = model.predict(x_test)
    y_pred = scalar.inverse_transform(y_pred)
    y_test = np.reshape(y_test, (-1, 1))
    y_test = scalar.inverse_transform(y_test)
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
    lst_output = scalar.inverse_transform(lst_output)

    print(lst_output)
    print(type(lst_output))

    d = np.array_str(y_pred, precision=6, suppress_small=True)
    e = np.array_str(y_test, suppress_small=True)
    f = np.array_str(lst_output, suppress_small=True)
    return d, e ,f
