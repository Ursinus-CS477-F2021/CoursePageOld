# Script to convert jams from the 402 site
fin = open("jams.txt")
fout = None
lines = fin.readlines()
for i, line in enumerate(lines):
    line = line.rstrip()
    if line[0:3] == "Jam":
        fout = open("jams/{}.txt".format(line.split("-")[-1]), "w")
    elif line[0] == ".":
        fout.close()
    else:
        line = line.split()
        if len(line) == 1:
            fout.write(line[0] + "\n")
            fout.write("2 5") # Goal location
        else:
            line = [line[i] for i in [1, 0, 2, 3]]
            fout.write("\n" + ("{} "*4).format(*tuple(line)))
