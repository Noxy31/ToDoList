<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Category {
  idCategory: number;
  labelCategory: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const labelList = ref('');
    const isPersonal = ref(false);
    const categories = ref<Category[]>([]);
    const selectedCategory = ref<number | null>(null);

    const fetchCategories = async () => {
      try {
        const response = await fetch('api/categories', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Error');
        }

        categories.value = await response.json();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    const createList = async () => {
      try {
        const response = await fetch('api/users/getUserId', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Error');
        }

        const { id: userId } = await response.json();

        const listData: any = {
          labelList: labelList.value,
          isPersonnal: isPersonal.value,
          idUser: userId
        };

        if (!isPersonal.value && selectedCategory.value) {
          listData.idCategory = selectedCategory.value;
        }

        const createResponse = await fetch('api/list/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listData)
        });

        if (!createResponse.ok) {
          throw new Error('Error');
        }

        alert('List successfully created');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      labelList,
      isPersonal,
      categories,
      selectedCategory,
      createList
    };
  }
});
</script>

<template>
  <div class="container">
    <h1>Create a new list</h1>
    <form class="createForm" @submit.prevent="createList">
      <div>
        <label for="labelList">Name of the list</label>
        <input type="text" v-model="labelList" required />
      </div>
      <div>
        <label>Personal list</label>
        <input type="checkbox" v-model="isPersonal" />
      </div>

      <div v-if="!isPersonal">
        <label for="category">Category:</label>
        <select v-model="selectedCategory" required>
          <option
            v-for="category in categories"
            :key="category.idCategory"
            :value="category.idCategory"
          >
            {{ category.labelCategory }}
          </option>
        </select>
      </div>

      <button type="submit">Create the list</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  margin-right: 5vw;
  margin-top: 5vh;
}

h1 {
  margin-bottom: 5vh;
  font-size: 3rem;
}

label {
  padding-right: 1vw;
}

button {
  text-decoration: none;
  background-color: #c1c1c1;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5vh;
}

.createForm {
  font-size: 1.5rem;
}
</style>
