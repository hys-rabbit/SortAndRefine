/**
 * ローマ字による絞り込み処理
 * @param {string} refineValue 
 * @description 入力された値をローマ字に含む行データのみ表示する。
 */
function refine (refineValue) {
    // tbody下の行エレメント群を取得
    var trElements = document.querySelector("table#prefectures_data tbody").children;
    // 行エレメント群を配列化
    var trEletemtArray = Array.prototype.slice.call(trElements);
    // 行の数だけ繰り返し処理
    for (var i = 0; i < trEletemtArray.length; i++) {
        // 行エレメントを取得
        var trEletemt = trEletemtArray[i];
        // ローマ列エレメントを取得
        var romanizationTdElement = trEletemt.children.item(2);
        // ローマ列エレメントのテキストに入力値が含まれない場合noneを設定
        var cssDisplay = "";
        if (!romanizationTdElement.innerText.includes(refineValue)) {
            cssDisplay = "none";
        }
        // ローマ列エレメントのcssのdisplayに設定
        trEletemtArray[i].setAttribute("style",`display:${cssDisplay}`);
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

    // 都道府県リスト
    prefectureList = [];
    // tbody下の行エレメント群を取得
    var trElements = document.querySelector("table#prefectures_data tbody").children;
    // 行エレメント群を配列化
    var trEletemtArray = Array.prototype.slice.call(trElements);
    // 各行のソート項目とノードを取得し行ノード保持変数に設定
    for (var i = 0; i < trEletemtArray.length; i++) {
        // 行エレメントを取得
        var trEletemt = trEletemtArray[i]
        // ソート項目テキストを行エレメントから取得
        var sortItemText = trEletemt.children.item(index).innerText;
        // ソート項目が人口の場合数値比較するので数値に変換
        if (index == 3) {
            sortItemText = Number(sortItemText.replace(/,/g, ''));
        }
        // 都道府県リストにソート条件値と行ノードを連想配列で保持
        prefectureList.push({
            item: sortItemText, // ソート項目
            node: trEletemt.cloneNode(true) // 行ノード
        });
    }

    // 都道府県リストをソート
    // ▼sort()詳細
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    prefectureList.sort(function(a, b) {
        if (a.item < b.item) {
            if (isUp) {
                return -1;
            } else {
                return 1;
            }
        } else if (a.item > b.item) {
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