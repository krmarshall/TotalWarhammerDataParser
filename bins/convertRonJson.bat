if not exist "D:\GitHub\TotalWarhammerDataParser\bins\jsonSchemas" mkdir D:\GitHub\TotalWarhammerDataParser\bins\jsonSchemas

type ..\rpfm-schemas\schema_wh2.ron | tt ron json > ./jsonSchemas/schema_wh2.json
type ..\rpfm-schemas\schema_wh3.ron | tt ron json > ./jsonSchemas/schema_wh3.json
