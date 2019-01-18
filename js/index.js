/**
 * ローマ字による絞り込み処理
 * @param {string} refineValue 
 * @description 入力された値をローマ字に含む行データのみ表示する。
 */
function refine (refineValue) {
    // tbodyの行ノード群を取得
    var trNodeArray = document.querySelector("table#prefectures_data tbody").childNodes;

    // 行の数だけ繰り返し処理
    for (var i = 0; i < trNodeArray.length; i++) {

        // 行ノードを取得
        var trNode = trNodeArray[i];

        // 絞り込み処理に不要なデータはスキップ
        if (trNode.nodeName == "#text") {
            continue;
        }

        // 行内のローマ字列のテキストデータを取得
        var romaCharText = trNode.childNodes[2].innerText;

        // displayのcss変数を定義
        var cssDisplay = "";

        // 入力された文字をテキストデータが含んでいない場合noneに設定
        if (!romaCharText.includes(refineValue)) {
            cssDisplay = "none";
        }

        // 行ノードのcssに反映
        trNode.style.display = cssDisplay;
    }
}

/**
 * 各項目のソート処理
 * @param {number} sortValue
 * @description 入力されたソート値を見て都道府県テーブルをソートする。
 * - 0 -> 未選択
 * - 1:0 -> 読み（昇順）
 * - 1:1 -> 読み（降順）
 * - 2:0 -> ローマ字（昇順）
 * - 2:1 -> ローマ字（降順）
 * - 3:0 -> 人口（昇順）
 * - 3:1 -> 人口（降順）
 */
function sort (sortValue) {

    // 未選択の場合処理終了
    if (sortValue == "0") {
        return;
    }

    // 選択されたキー値を分割し項目番号と昇順判定として変数で保持
    var sortValueArray = sortValue.split(":");
    var index = Number(sortValueArray[0]); // 項目番号
    var isUp = sortValueArray[1] == "0"; // 昇順判定

    // テーブルノードを保持
    prefectureList = [];

    var trNodeArray = document.querySelector("table#prefectures_data tbody").childNodes;

    for (var i = 0; i < trNodeArray.length; i++) {
        var trNode = trNodeArray[i]
        if (trNode.nodeName == "#text") {
            continue;
        }

        // ソート条件値を取得する
        var sortKey = trNode.childNodes[index].innerText;

        // ソート条件値が人口の場合数値比較するので数値に変換
        if (index == 3) {
            sortKey = Number(sortKey.replace(/,/g, ''));
        }

        // 都道府県リストにソート条件値と行ノードを連想配列で保持
        prefectureList.push({
            sortKey: sortKey, // ソート条件値
            node: trNode.cloneNode(true) // 行ノード
        });

    }

    // テーブルノードをソート
    prefectureList.sort(function(a, b) {
        if (a.sortKey < b.sortKey) {
            if (isUp) {
                return -1;
            } else {
                return 1;
            }
        } else if (a.sortKey > b.sortKey) {
            if (isUp) {
                return 1
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    });

    // tbody内のHTMLを削除
    document.querySelector("table#prefectures_data tbody").innerHTML = '';

    // tbody内に保持していた行ノードを追加しテーブルを再構築する
    for (var i = 0; i < prefectureList.length; i++) {
        var prefecture = prefectureList[i];
        var trNode = prefecture.node;
        document.querySelector("table#prefectures_data tbody").appendChild(trNode);
    }
}