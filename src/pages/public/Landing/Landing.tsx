import { Link } from "react-router";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { PostCard } from "../../../components/Card/PostCard";

const LandingPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-semibold">Landing Page</h1>
      <Link to={"/auth/login"} className="underline">
        Login
      </Link>
      <div className="grid grid-cols-3 gap-2">
        <Button size="lg" variant="primary">
          Primary
        </Button>
        <Button size="lg" variant="secondary">
          Secondary
        </Button>
        <Button size="lg" variant="destructive">
          Destructive
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button size="default" variant="primary">
          Primary
        </Button>
        <Button size="default" variant="secondary">
          Secondary
        </Button>
        <Button size="default" variant="destructive">
          Destructive
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button size="sm" variant="primary">
          Primary
        </Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="destructive">
          Destructive
        </Button>
      </div>
      <Input label="Input" placeholder="Placeholder" />
      <PostCard
        badge="Test"
        title="Risol Mayo"
        timeAgo="200"
        likesCount={200}
        owner="Fauzi Ahmad Zaki"
      />
    </main>
  );
};

export default LandingPage;
