import io

def main():
  with io.open("gamenames", "r", newline=None) as fd:
    for line in fd:
        line = line.replace("\n", "")
        line = line.replace("'", "")
        line = line.replace("/", "")
        line = line.replace(".", "")
        line = line.replace("%", "")
        line = line.replace("#", "")
        line = line.replace("$", "")
        line = line.replace(",", "")
        line = line.replace(";", "")
        line = line.replace("`", "")
        line = line.replace("\\", "")
        line = line.replace(" \" ", "")

        print(".raw(\"insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('%s', 1, 1, '1988-08-08', '1988-08-08')\")" % (line) )

if __name__ == "__main__":
    main()
