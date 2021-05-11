<template>
  <div id="app">
    <div id="app">
    <div class="container">
        <div class="todo-list-area">
            <h4 id="title1">toDoメモ</h4>
            <ul class="todo-list">
                <li v-for="(todo, index) in todoList" v-bind:id="['todo-' + todo.id]" :key="todo">
                    <input type="checkbox" v-bind:id="['todo-check-' + index]" v-model="todoCheck" v-on:click="deleteTodo(index)">
                    <span v-cloak>{{ index + 1 }} : {{ todo.todo }}</span>
                </li>
                <span v-show="!todoList.length" class="no_todo" v-cloak>リストが登録されていません。</span>
            </ul>
        </div>
        <div class="todo-input-area">
            <h4 id="title2">toDoを登録する</h4>
            <input type="text" placeholder="ここにtoDoを入力" v-model.trim="todo" ><!--v-model:trimは空白を取り除くの意味-->
            <button v-on:click="registTodo()">登録</button>
            <p class="errMessage" v-if="errMessage" v-cloak>{{ errMessage }}</p>
        </div>
    </div>
</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
/*[todoList]の名で保存してあるローカルストレージを読み込む*/
    let getTodoLocalStorage = function(){
        let todoList = [];//ローカルストレージが存在しない場合は空配列を返す
        if(localStorage.getItem('todoList') != null){
        //もしローカルストレージの[todoList]が空でなかったら
            todoList = localStorage.getItem('todoList');
            //変数「todoList」に読み込んだローカルストレージを全て覚えておく
            todoList = JSON.parse(todoList);
            //変数「todoList」の中身をJSON形式に変換して同じ変数に覚え直す
        }
        return todoList;//関数が呼ばれたところに変数の値を返す
    }

    /*toDoメモを[todoList]の名でローカルストレージに保存させるところ*/
    let setTodoLocalStorage = function(todoList){
        let jsonData = JSON.stringify(todoList);
        //JOSN形式で保存させる
        localStorage.setItem('todoList', jsonData);
    }

    /*完了ボタンが押されたら押された所だけをローカルストレージから削除するところ*/
    let deleteTodoLocalStorage = function(index){
        let todoList = getTodoLocalStorage();
        todoList.splice(index, 1);
        //spliceは配列から1つだけ抜き取る
        setTodoLocalStorage(todoList);
        //1つだけ抜き取られた変数をローカルストレージに保存し直す
    }

    export default {
        name: 'App',
        data: function() {
          return{
            todoList: getTodoLocalStorage(),
            //ストレージを読み込む関数を呼んで返ってきた値を変数に覚える
            todo: '',
            //inputタグに入力された値
            errMessage: '',
            //入力にエラーがあった時のメッセージ
            todoCheck: false
            //チェックボックスの状態（初期値はoff）
          }
        },
        methods: {
            /*登録ボタンが押されたとき*/
            registTodo: function(){
                let todoObj = {}
                todoObj.todo = this.todo

                //ここからエラーのチェック
                if(!todoObj.todo){
                //もし空欄だったら
                    this.errMessage = '内容を入力してください。';
                    return;
                    //関数が呼ばれたところへ戻り処理を中断
                }else if(todoObj.todo.length > 20){
                //入力した文字数が20文字を超えたら
                    this.errMessage = '20文字以内で入力してください';
                    return;
                    //関数が呼ばれたところへ戻り処理を中断
                }
                //エラーが治ったらエラーメッセージを空にする
                this.errMessage = '';

                //ローカルストレージを読み込む関数を呼ぶ
                let todoList = getTodoLocalStorage();
                let index = todoList.length;
                todoObj.id = index;

                //保存するリストに追加する
                todoList.push(todoObj)

                //ローカルストレージに保存する関数を呼ぶ
                setTodoLocalStorage(todoList);

                //読み込んだリストを画面に表示
                this.todoList = getTodoLocalStorage()

                //inputタグの値を空にする
                this.todo = ''
            },

            /*完了ボタンが押されたとき*/
            deleteTodo: function(index){
                //押されたリストを削除する関数を呼ぶ
                deleteTodoLocalStorage(index);

                //削除したtoDoを画面にも反映させる
                this.todoList = getTodoLocalStorage();

                //チェックボックスの状態を初期値に戻す
                this.todoCheck = false;
            }
        }
    };
</script>
