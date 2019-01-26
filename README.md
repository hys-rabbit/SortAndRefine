# SortAndRefine
Table sort and refine by JavaScript.

## Data to table.
下記コマンドでテーブルに変換できます。
```:shell
// リポジトリ直下で実行
% cat resources/prefectures.txt | awk '{printf "<tr><td>%s</td><td>%s</td><td>%s</td><td>%\047d</td></tr>\n", $1, $2, $3, $4}'
<tr><td>北海道</td><td>ほっかいどう</td><td>hokkaido</td><td>5,285,430</td></tr>
<tr><td>青森</td><td>あおもり</td><td>aomori</td><td>1,262,686</td></tr>
<tr><td>岩手</td><td>いわて</td><td>iwate</td><td>1,240,522</td></tr>
.
.
.
```