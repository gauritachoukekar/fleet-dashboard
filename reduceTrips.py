import json

def reduce_trip(input_file, output_file, step=10):

    with open(input_file, "r") as f:
        data = json.load(f)

    original_count = len(data)

    # Keep every Nth event
    reduced = data[::step]

    with open(output_file, "w") as f:
        json.dump(reduced, f, indent=2)

    print(
        f"{input_file} reduced "
        f"from {original_count} "
        f"to {len(reduced)} events"
    )


# Reduce large files

reduce_trip(
    "src/data/trip_1_cross_country.json",
    "src/data/trip_1_cross_country.json",
    step=10
)

reduce_trip(
    "src/data/trip_4_southern_technical.json",
    "src/data/trip_4_southern_technical.json",
    step=5
)