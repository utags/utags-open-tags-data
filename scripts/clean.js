import fs from "node:fs"

const files = ["v2ex.com.json", "twitter.com.json"]

function main() {
  for (const file of files) {
    const text = fs.readFileSync("data/" + file, "utf8")
    try {
      const json = JSON.parse(text)
      const data = json.data
      if (data) {
        // console.log(data)
        const entries = Object.entries(data)
        for (const [key, value] of entries) {
          if (key === "end" || key === "meta") {
            continue
          }

          if (value) {
            const entries = Object.entries(value)
            for (const [key2, value2] of entries) {
              if (key2 === "tags") {
                if (value2.length === 0) {
                  console.warn("No tag found:", key)
                }
              } else if (key2 === "meta") {
                const entries = Object.entries(value2)
                for (const [key3] of entries) {
                  if (!(key3 === "title" || key3 === "type")) {
                    delete value2[key3]
                  }
                }
              } else {
                delete value[key2]
              }
            }
          }
        }
      }

      fs.writeFileSync(
        "data/" + file,
        JSON.stringify(json, null, 2) + "\n",
        "utf8"
      )
    } catch (error) {
      console.error(error)
    }
  }
}

main()
