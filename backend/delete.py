import csv

# Input and output file paths
input_file = './csvs/mallet_imu_real.csv'
output_file = './csvs/mallet_imu_ong.csv'

# Function to delete every alternate row
def delete_alternate_rows(input_file, output_file):
    with open(input_file, 'r') as file:
        reader = csv.reader(file)
        data = list(reader)

    with open(output_file, 'w', newline='') as file:
        writer = csv.writer(file)
        for i, row in enumerate(data):
            if i % 8 == 1:  # Keep even-indexed rows (0-based index)
                writer.writerow(row)

# Call the function to delete alternate rows
delete_alternate_rows(input_file, output_file)
