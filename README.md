# SortAndRefine
Table sort and refine by JavaScript.

## Data to table.
下記コマンドでテーブルに変換できます。
```:shell
% cat resources/prefectures.txt | awk '{print "<tr><td>"$1"</td><td>"$2"</td><td>"$3"</td><td>"$4"</td></tr>"}'
<tr><td>北海道</td><td>ほっかいどう</td><td>hokkaido</td><td>5,285,430</td></tr>
<tr><td>青森</td><td>あおもり</td><td>aomori</td><td>1,262,686</td></tr>
<tr><td>岩手</td><td>いわて</td><td>iwate</td><td>1,240,522</td></tr>
.
.
.
```