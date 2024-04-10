# show results for the models in use
import pickle
import pandas as pd
import psycopg2
import sys
import json

# Load the trained model from the pickle file
def load_model_and_predict():
    with open("decision_tree_model.pkl", "rb") as f:
        model = pickle.load(f)

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
            dbname="rul_dashboard",
            user="postgres",
            password="rul@123",
            host="10.29.8.84",
            port="5432"
        )
    cursor = conn.cursor()

    # Retrieve data from the database
    cursor.execute("SELECT f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14 FROM motor_feature")
    data = cursor.fetchall()
    columns = ['F_0','F_1', 'F_2', 'F_3', 'F_4', 'F_5', 'F_6', 'F_7', 'F_8', 'F_9', 'F_10', 'F_11', 'F_12', 'F_13']
    df = pd.DataFrame(data, columns=columns)

    # Make predictions
    predictions = model.predict(df)

    # Close database connection
    conn.close()

    return predictions.tolist()

# Main function to handle input and output
def main():
    # Read input from stdin
    input_data = json.loads(sys.stdin.read())
    
    # Call the function to load model and predict
    predictions = load_model_and_predict()

    # Output the predictions to stdout
    print(json.dumps(predictions))

if __name__ == "__main__":
    main()
