<template>
  <div v-if="groupModalStore.isOpen">
    <div
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      @click="
        () => {
          groupModalStore.setIsOpen(false);
        }
      "
    >
      <div
        class="neon-border m-3 min-w-[350px] rounded-2xl bg-black/80 py-3"
        @click.stop=""
        style="--neon-color: var(--neon-soju-color)"
      >
        <div>
          <BaseGroupCardContent
            class="my-5"
            :name="groupModalStore.groupName"
            :description="groupModalStore.description"
            :totalPaid="groupModalStore.totalPaid"
            :memberCount="String(3)"
          />
          <div
            class="neon-border"
            style="--neon-color: #ccc; border: 1px solid"
          ></div>
          <div class="mt-3 flex w-full justify-center text-center text-2xl">
            멤버
          </div>
          <div
            class="flex max-h-[300px] flex-col overflow-y-auto lg:max-h-[280px]"
          >
            <div
              class="my-auto grid grid-cols-1 items-center justify-center space-y-3 px-6 py-3 md:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="member in dummyList"
                :key="member.id"
                class="flex max-w-full justify-center"
              >
                <label class="peer flex max-w-full flex-col">
                  <span
                    class="neon-border max-w-full truncate overflow-hidden rounded-2xl p-3 text-ellipsis whitespace-nowrap"
                  >
                    <div class="hidden">{{ member.id }}</div>
                    <div class="max-w-full truncate overflow-hidden">
                      닉네임 : {{ member.nickname }}
                    </div>
                    <div class="max-w-full truncate overflow-hidden">
                      이메일 : {{ member.email }}
                    </div>
                  </span>
                  <div
                    class="m-3 flex items-center justify-center"
                    v-if="groupModalStore.isModify"
                  >
                    <input
                      type="checkbox"
                      class="peer sr-only"
                      :value="member.id"
                      v-model="checkedItem"
                      @change="
                        () => {
                          console.log(member);
                        }
                      "
                    />
                    <div
                      class="neon-border size-6 rounded-sm bg-transparent peer-checked:bg-white peer-checked:text-white peer-checked:after:mt-0.5 peer-checked:after:flex peer-checked:after:text-center peer-checked:after:text-sm peer-checked:after:leading-[1rem] peer-checked:after:content-['⬜']"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div :style="{ opacity: deleteButtonOpacity + '%' }">
            <BaseButton
              neonColor="#ff0000"
              hoverColor="#cc0000"
              class="text-sm"
              @click="deleteMembersAction"
            >
              멤버 삭제
            </BaseButton>
          </div>
          <div class="relative flex items-center justify-between">
            <div v-if="groupModalStore.modalState == 2">
              <BaseButton
                neonColor="#00ccff"
                class="md:text-md min-w-[90px] text-xs"
                @click="
                  () => {
                    groupModalStore.setIsOpen(false);
                  }
                "
              >
                그룹 삭제
              </BaseButton>
            </div>

            <div v-if="groupModalStore.modalState == 2">
              <BaseButton
                neonColor="#00ccff"
                class="md:text-md min-w-[90px] text-xs"
                @click="
                  () => {
                    groupModalStore.setIsModify(!groupModalStore.isModify);
                    if (!groupModalStore.isModify) {
                      checkedItem = [];
                    }
                  }
                "
              >
                {{ groupModalStore.isModify ? "수정 완료" : "그룹 수정" }}
              </BaseButton>
            </div>

            <div v-if="groupModalStore.modalState == 1">
              <BaseButton
                neonColor="#00ccff"
                class="md:text-md min-w-[90px] text-xs"
                @click="change(0)"
              >
                그룹 가입
              </BaseButton>
            </div>

            <BaseButton
              neonColor="#00ccff"
              class="md:text-md min-w-[90px] text-xs"
              @click="
                () => {
                  groupModalStore.setIsOpen(false);
                  groupModalStore.setIsModify(false);
                }
              "
            >
              나가기
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useGroupApi } from "@/api/group.js";
import { useGroupModalStore } from "@/stores/GroupModal.js";
import { toRaw } from "vue";

import BaseGroupCardContent from "./BaseGroupCardContent.vue";

const { members } = useGroupApi();
const groupModalStore = useGroupModalStore();

const memberList = ref([]);
const checkedItem = ref([]);
const deleteButtonOpacity = computed(() =>
  checkedItem.value.length > 0 ? "100" : "0",
);

const addMemberAction = () => {};
const deleteMembersAction = () => {
  // 1. 선택된 멤버들 따로 저장 >> 완
  // 2. API 통신 >> 마지막
  // 3. 내부적으로 요소 삭제
  // 1번
  let tmp = toRaw(checkedItem.value);
  console.log("배열 결과 : " + tmp);
  // 3번
  // checkedItem 초기화
  // memberList의 checked된 요소 삭제
  // 조건 : 찾아서 삭제

  console.log(memberList.value);
};

const dummyList = ref([]);

// 같은 그룹 카드를 눌렀을 경우 모든 값이 같으므로 변경하지 않게 설정
// later : case>> 중간에 멤버가 들어왔을 경우? 새로고침이 안됨 즉, 멤버의 수 기준으로 watch를 해야한다
// later : 백엔드 단에서 멤버의 수도 보내줘야겟다
watch(
  () => groupModalStore.getGroupId,
  async (newGroupId) => {
    console.log("BaseModal로 온 GroupId : " + newGroupId);

    // groupId가 변경되었다면 리스트를 먼저 초기화
    memberList.value = [];
    const res = await members(newGroupId);
    console.log("GroupId으로 찾아온 멤버들 : " + res);
    memberList.value = res.data;
  },
);

onMounted(() => {
  // 더미데이터 생성 후 삽입
  let tmp = [];
  for (let i = 0; i < 15; i++) {
    tmp.push({ nickname: "테스트" + i, email: "example" + i, id: i });
  }

  dummyList.value = tmp;
});
</script>

<style scoped>
@import "@/styles/neon.css";
@import "@/style.css";
</style>
