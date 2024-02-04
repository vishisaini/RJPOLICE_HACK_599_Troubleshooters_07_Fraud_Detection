import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense, Dropout
from tensorflow.keras.callbacks import TensorBoard
import datetime

import csv
def spam_ham(messages):
	# Specify your CSV file path
	csv_file_path = 'spam.csv'
	# List to store ham messages
	ham_texts = []
	# Read the CSV file
	with open(csv_file_path, 'r', encoding='latin-1') as file:
		csv_reader = csv.reader(file)
		next(csv_reader)  # Skip the header if there is one
		for row in csv_reader:
			message, label = row[1], row[0]
			if label.lower() == 'ham':
				ham_texts.append(message)
				max_words = 10000  # Maximum number of words in vocabulary
				max_sequence_length = 100  # Maximum sequence length

	tokenizer = Tokenizer(num_words=max_words)
	tokenizer.fit_on_texts(ham_texts)
	sequences = tokenizer.texts_to_sequences(ham_texts)
	X = pad_sequences(sequences, maxlen=max_sequence_length)

	# Create a CNN model
	model = Sequential([
	    Embedding(input_dim=max_words, output_dim=100, input_length=max_sequence_length),
	    Conv1D(filters=128, kernel_size=5, activation='relu'),
	    GlobalMaxPooling1D(),
	    Dense(64, activation='relu'),
	    Dropout(0.5),
	    Dense(1, activation='sigmoid')
	])

	# Compile the model
	model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

	# Train the model
	model.fit(X, np.zeros(len(X)), epochs=5, batch_size=32, verbose=0)  # We use a dummy target since we're only interested in the embeddings

	# Get the word embeddings
	word_embeddings = model.layers[0].get_weights()[0]

	from sklearn.metrics.pairwise import cosine_similarity

	# Assume you have the word embeddings and tokenizer from the previous code

	# Preprocess new message
	new_message = messages
	new_sequence = tokenizer.texts_to_sequences([new_message])
	new_X = pad_sequences(new_sequence, maxlen=max_sequence_length)

	# Get the embedding for the new message
	new_embedding = model.layers[0].get_weights()[0][new_X[0]]

	# Calculate cosine similarity between the new message and all messages in the network
	similarities = cosine_similarity(new_embedding, word_embeddings)

	if similarities[0][0]>1.0:
		print("Ham")
		return 1
	else:
		print("Spam")
		return 0
	    

	    
