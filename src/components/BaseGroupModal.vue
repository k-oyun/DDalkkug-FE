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
        class="neon-border relative m-3 min-w-[350px] rounded-2xl bg-black/80 py-3"
        @click.stop=""
        @click=""
        style="--neon-color: var(--neon-soju-color)"
      >
        <div class="absolute z-50 h-full w-full" v-if="innerModalState">
          <div class="my-auto flex h-full items-center justify-center">
            <div
              class="neon-border max-h-[200px] min-w-[300px] rounded bg-black/80 p-6"
              style="--neon-color: #ffbe36"
            >
              <div
                class="flex h-full flex-col items-center justify-between space-y-5"
              >
                <div>
                  정말로
                  <span class="font-bold">그룹</span>
                  을 삭제하시겠습니까?
                </div>
                <div class="flex w-full justify-between">
                  <BaseButton
                    neonColor="#ff0000"
                    hoverColor="#cc0000"
                    class="text-sm"
                    @click="
                      async () => {
                        groupModalStore.setIsOpen(false);
                        await deleteGroupApi();
                      }
                    "
                  >
                    그룹 삭제
                  </BaseButton>
                  <BaseButton
                    neonColor="#00ccff"
                    hoverColor="#00b8ff"
                    class="text-sm"
                    @click="
                      () => {
                        innerModalState = false;
                      }
                    "
                  >
                    취소
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                neonColor="#ffbe36"
                hoverColor="#ffaa00"
                class="md:text-md min-w-[90px] text-xs"
                @click="
                  () => {
                    innerModalState = true;
                  }
                "
              >
                그룹 삭제
              </BaseButton>
            </div>

            <div v-if="groupModalStore.modalState == 2">
              <BaseButton
                neonColor="#f78ed3"
                hoverColor="#f245b6"
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

const { members, deleteGroup, deleteGroupMember } = useGroupApi();
const groupModalStore = useGroupModalStore();

const innerModalState = ref(false);

const memberList = ref([]);
const checkedItem = ref([]);
const deleteButtonOpacity = computed(() =>
  checkedItem.value.length > 0 ? "100" : "0",
);

const addMemberAction = () => {};
const deleteMembersAction = async () => {
  // 메소드 설명
  // 상세페이지를 누를 떄마다 api 통신은 많은 오버헤드 발생
  // 똑같은 그룹을 계속 누를경우 api 통신이 필요할까? 에서 만듦
  // 그룹 멤버 수정에서 삭제의 경우 삭제한 경우를 기억해놓음
  // 즉, 변화된 값이 없을 경우는 계속 유지되게 함
  // 만들어보니 굳이할 필요가 없었을 듯,,,

  // 선택된 멤버 리스트를 저장
  let checkedId = toRaw(checkedItem.value);
  console.log(checkedId);

  // 선택된 멤버를 제외한 멤버리스트를 뽑아냄
  let filteredMember = [];
  toRaw(dummyList.value).filter((obj) => {
    if (checkedId.find((item) => obj.id == item)) return false;
    filteredMember.push(obj);
    return true;
  });

  // 멤버리스트를 local 상에서 저장
  dummyList.value = filteredMember;

  // api로 싹다 삭제
  console.log(dummyList);

  // checked 멤버를 기준으로 api 순차호출
  checkedItem.value.map((id) => {
    console.log(id);
    // later : 캡션 지우기
    // await deleteGroupMember(groupModalStore.getGroupId, id);
  });
};

const dummyList = ref([]);

// 같은 그룹 카드를 눌렀을 경우 모든 값이 같으므로 변경하지 않게 설정
// later : case>> 중간에 멤버가 들어왔을 경우? 새로고침이 안됨 즉, 멤버의 수 기준으로 watch를 해야한다
// later : 백엔드 단에서 멤버의 수도 보내줘야겟다
// later : groupId 변했는가? group의 멤버수가 변했는가? 두개를 판단해야한다
watch(
  () => groupModalStore.getGroupId,
  async (newGroupId) => {
    console.log("BaseModal로 온 GroupId : " + newGroupId);

    // groupId가 변경되었다면 리스트를 먼저 초기화
    memberList.value = [];
    checkedItem.value = [];
    const res = await members(newGroupId);
    console.log("GroupId으로 찾아온 멤버들");
    console.log(res.data.data);
    console.log("이 방의 leaderId : " + groupModalStore.leaderId);
    console.log("리더를 제외한 멤버들");
    console.log(
      res.data.data.filter((obj) => obj.id !== groupModalStore.leaderId),
    );
    // 그룹장을 제외하고 멤버들을 넣음
    memberList.value = res.data.data.filter(
      (obj) => obj.id !== groupModalStore.leaderId,
    );
  },
);

const deleteGroupApi = async () => {
  console.log("그룹 삭제 시행!");
  // later : 캡션 제거
  //await deleteGroup(groupModalStore.getGroupId);
};

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
