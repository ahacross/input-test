<template>
  <w-app>
    <w-select label="type" v-model="selectedType" :items="types" outline />
    <div class="rowDiv">
      <w-checkbox v-model="checkHint" @change="applyHint">
        enterkeyhint
      </w-checkbox>
      <w-select
        v-model="selectedHint"
        :items="hints"
        @item-select="applyHint"
      />
    </div>
    <div class="rowDiv">
      <w-checkbox v-model="checkInputMode" @change="applyInputMode">
        inputMode
      </w-checkbox>
      <w-select
        v-model="selectedMode"
        :items="modes"
        @item-select="applyInputMode"
      />
    </div>
    <div class="rowDiv">
      <w-checkbox v-model="checkPattern" @change="applyPattern">
        pattern
      </w-checkbox>
      <w-input v-model="pattern" @blur="applyPattern" />
    </div>

    <div style="display: flex; align-items: end">
      <input
        v-model="inputValue"
        class="keypadInput"
        ref="input"
        placeholder="여기를 눌러주세요"
        :type="selectedType"
        @keydown="debounceKeyCode"
        @focusin="onFocus"
      />
      <button
        style="height: 35px; margin: 0 5px"
        @click="onClear('inputValue')"
      >
        clear
      </button>
      <button style="height: 35px" @click="onClear('keyCodeHistory')">
        log clear
      </button>
    </div>

    <w-textarea v-model="keyCodeHistory" readonly />
  </w-app>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "App",
  data() {
    return {
      selectedType: "text",
      types: [
        { label: "text" },
        { label: "number" },
        { label: "tel" },
        { label: "email" },
        { label: "password" },
        { label: "search" },
        { label: "url" },
        { label: "date" },
        { label: "time" },
        { label: "datetime-local" },
        { label: "month" },
        { label: "week" },
        { label: "color" },
      ],

      hints: [
        { label: "enter" },
        { label: "done" },
        { label: "go" },
        { label: "next" },
        { label: "previous" },
        { label: "search" },
        { label: "send" },
      ],
      modes: [
        { label: "text" },
        { label: "decimal" },
        { label: "numeric" },
        { label: "tel" },
        { label: "search" },
        { label: "email" },
        { label: "url" },
        { label: "none" },
      ],
      checkHint: false,
      selectedHint: "",
      checkInputMode: false,
      selectedMode: "",
      checkPattern: false,
      pattern: "",
      inputValue: "",
      keyCodeHistory: "",
      debounceKeyCode: debounce(this.logKeyCode, 50),
      storageKey: "selectedKeypad",
    };
  },
  mounted() {
    this.loadSelectedData();
  },
  methods: {
    logKeyCode(evt) {
      const { keyCode, key, code, which } = evt;
      const history = `code: ${code}, key: ${key}, keyCode: ${
        which || keyCode
      }\n`;
      this.keyCodeHistory = history + this.keyCodeHistory;
    },
    applyHint() {
      this.applyAttr("enterkeyhint", this.checkHint, this.selectedHint);
    },
    applyInputMode() {
      this.applyAttr("inputmode", this.checkInputMode, this.selectedMode);
    },
    applyPattern() {
      this.applyAttr("pattern", this.checkPattern, this.pattern);
    },
    applyAttr(name, check, value) {
      const target = this.$refs.input;

      if (check && value) {
        target.setAttribute(name, value);
      } else {
        target.removeAttribute(name);
      }
    },
    onClear(target) {
      this[target] = "";
    },
    saveSelectedData() {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          checkHint: this.checkHint,
          selectedHint: this.selectedHint,
          checkInputMode: this.checkInputMode,
          selectedMode: this.selectedMode,
          checkPattern: this.checkPattern,
          pattern: this.pattern,
          selectedType: this.selectedType,
        })
      );
    },
    loadSelectedData() {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const {
          checkHint,
          selectedHint,
          checkInputMode,
          selectedMode,
          checkPattern,
          pattern,
          selectedType,
        } = JSON.parse(data);
        this.checkHint = checkHint;
        this.selectedHint = selectedHint;
        this.checkInputMode = checkInputMode;
        this.selectedMode = selectedMode;
        this.checkPattern = checkPattern;
        this.pattern = pattern;
        this.selectedType = selectedType;
      }
    },
    onFocus() {
      this.saveSelectedData();
    },
  },
};
</script>

<style scoped>
.w-select,
.w-input {
  flex-grow: initial;
  margin-bottom: 15px;
}
.rowDiv {
  display: flex;
}
.rowDiv .w-select,
.rowDiv .w-input {
  flex: 1;
  margin-left: 10px;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

input.keypadInput {
  height: 35px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
}
</style>
