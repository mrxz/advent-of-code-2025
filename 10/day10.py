from z3 import *

input = [
    # Insert AoC day 10 input here
    "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
    "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}",
    "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
]

sum_part2 = 0
for line in input:
    parts = line.split(" ")
    buttons = [[int(y) for y in x[1:-1].split(",")] for x in parts[1:-1]]
    joltage = [int(x) for x in parts[-1][1:-1].split(",")]

    # Create constraints
    constraints = []
    button_ints = [Int(f"button_{ind}") for ind, x in enumerate(buttons)]
    formulas = [0 for _ in joltage]
    for button_index, button in enumerate(buttons):
        for machine_index in button:
            formulas[machine_index] = formulas[machine_index] + button_ints[button_index]
    for formula_index, formula in enumerate(formulas):
        constraints.append(formula == joltage[formula_index])
    sum_fml = 0
    for button_int in button_ints:
        constraints.append(button_int >= 0)
        sum_fml = sum_fml + button_int

    # Run solver repeatedly with the solution as upper-bound until no better solution is found
    s = Solver()
    s.add(constraints)
    res = s.check()
    best_result = None
    while res == sat:
        best_result = sum([s.model().eval(button_int).as_long() for button_int in button_ints])
        s.add(sum_fml < best_result)
        res = s.check()
    sum_part2 = sum_part2 + best_result

print(sum_part2)